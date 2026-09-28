import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        int target = Integer.parseInt(System.in);

        while (true) {
            String line = System.in.readLine();
            if (line.isEmpty()) {
                break;
            }
            try {
                numbers.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                continue;
            }
        }

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
