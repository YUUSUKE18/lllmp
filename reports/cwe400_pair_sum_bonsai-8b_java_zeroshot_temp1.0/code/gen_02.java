import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        for (int i = 0; i < args.length; i++) {
            String line = args[i].trim();
            if (line.isEmpty()) continue;
            try {
                numbers.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int target = numbers.get(0);
        numbers.remove(0);

        int count = 0;
        Set<Integer> seen = new HashSet<>();
        for (int i = 0; i < numbers.size(); i++) {
            int num = numbers.get(i);
            if (seen.contains(num)) continue;
            seen.add(num);
            for (int j = i + 1; j < numbers.size(); j++) {
                int otherNum = numbers.get(j);
                if (num + otherNum == target) {
                    count++;
                    seen.add(otherNum);
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
