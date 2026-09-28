import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(System.in);
        List<Integer> numbers = new ArrayList<>();
        boolean found = false;

        while (true) {
            String line = System.in.readLine();
            if (line.isEmpty()) {
                break;
            }
            try {
                int number = Integer.parseInt(line);
                numbers.add(number);
                if (numbers.size() >= 2 && numbers.get(numbers.size() - 1) + numbers.get(numbers.size() - 2) == target) {
                    found = true;
                    break;
                }
            } catch (NumberFormatException e) {
                // Ignore non-integer lines
            }
        }

        if (found) {
            System.out.println("pairs=" + (numbers.size() - 2));
        } else {
            System.out.println("pairs=0");
        }
    }
}
