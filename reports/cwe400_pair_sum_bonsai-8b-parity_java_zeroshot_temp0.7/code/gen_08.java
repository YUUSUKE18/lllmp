import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String targetLine = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        
        int target = Integer.parseLong(targetLine);
        int count = 0;
        
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
